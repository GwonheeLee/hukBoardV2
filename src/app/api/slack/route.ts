import { DateObject } from "./../../../utils/date";
import { config } from "@/lib/config";
import { dbConnect } from "@/lib/mongodb";
import { Member } from "@/models/member.model";
import { addEventHistory, updateApproval } from "@/service/eventHistory";
import { sendSlackChat, sendSlackChatManager } from "@/service/slack";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "querystring";

export async function POST(req: NextRequest) {
  try {
    const reader = req.body!.getReader();
    let result = await reader.read();
    let decoder = new TextDecoder("utf-8");
    let body = "";

    while (!result.done) {
      body += decoder.decode(result.value);
      result = await reader.read();
    }

    const payload = parse(body);
    if (typeof payload?.payload !== "string") {
      return new Response("Failed", { status: 400 });
    }

    const parsedPayload = JSON.parse(payload.payload);

    const verifyToken = parsedPayload.token;

    if (verifyToken !== config.slack.verifyToken) {
      return new Response("UnAuthorized", { status: 403 });
    }

    const slackUID = parsedPayload.user.id;

    // 모달 오픈
    if (parsedPayload.type === "shortcut") {
      fetch(VIEW_OPEN_URL, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + config.slack.botToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          view: MODAL,
          trigger_id: parsedPayload.trigger_id,
        }),
      });
    }
    // 모달 Submit
    else if (parsedPayload.type === "view_submission") {
      await dbConnect();
      // 등록 된 사용자 인지 체크
      if (!slackUID || slackUID === "") {
        return new Response("UnAuthorized", { status: 403 });
      }

      const member = await Member.findOne({ slackUID: slackUID });

      if (!member) {
        return new Response("UnAuthorized", { status: 403 });
      }

      const state = parsedPayload?.view?.state?.values;
      const stateArray = Object.values(state);

      let date;
      let eventCode;
      let description;

      for (let i = 0; i < stateArray.length; i++) {
        let obj = stateArray[i] as any;
        let actionId = Object.keys(obj)[0];

        switch (actionId) {
          case DATE_PICKER_ID:
            date = obj[actionId]["selected_date"];
            break;
          case EVENT_OTPION_ID:
            eventCode =
              obj[actionId]["selected_option"] &&
              obj[actionId]["selected_option"]["value"];
            break;
          case DESCRIPTION_ID:
            description = obj[actionId]["value"];
            break;
          default:
            throw new Error("올바른 Action ID 가 아닙니다." + actionId);
        }
      }

      if (!description) {
        return new Response("Bad Request", { status: 404 });
      }

      const result = await addEventHistory({
        eventCode,
        email: member.email,
        description,
        startDate: date,
        endDate: date,
      });

      if (date >= new DateObject().toShortDate()) {
        const approval = await updateApproval(result, true);

        if (approval) {
          const message = `
          [자동 승인 완료]
          ID : ${result}
          요청자 : ${member.name}
          이벤트 :${getEventName(eventCode)}
          사유 : ${description}
          일정 : ${date} - ${date}
          승인자 : JOB 
          `;
          sendSlackChat(member.slackUID, message);
          sendSlackChatManager(member.teamCode, message);
          //await sendSlackChatCompany(member.workType, message);
        } else {
          const message = `
          [자동 승인 실패]
          ID : ${result}
          요청자 : ${member.name}
          이벤트 : ${getEventName(eventCode)}
          사유 : ${description}
          일정 : ${date} - ${date}
          `;
          sendSlackChat(member.slackUID, message);
        }
      } else {
        const message = `
        [승인 요청]
        이름 : ${member.name}
        이벤트 : ${getEventName(eventCode)}
        일정 : ${date} - ${date}
        `;
        sendSlackChatManager(member.teamCode, message);
      }
    }

    return new Response();
  } catch (e) {
    return new Response("Unknown", { status: 500 });
  }
}

function getEventName(eventCode: string) {
  switch (eventCode) {
    case "E00001":
      return "연차";
    case "E00002":
      return "오후반차";
    case "E00003":
      return "오전반차";
    default:
      return "Unknown";
  }
}
const VIEW_OPEN_URL = "https://slack.com/api/views.open";

const DATE_PICKER_ID = "datepicker-action";
const EVENT_OTPION_ID = "selectbox-action";
const DESCRIPTION_ID = "multilineinput-action";

const MODAL = {
  type: "modal",
  submit: {
    type: "plain_text",
    text: "Submit",
    emoji: true,
  },
  close: {
    type: "plain_text",
    text: "Cancel",
    emoji: true,
  },
  title: {
    type: "plain_text",
    text: "이벤트 등록",
    emoji: true,
  },
  blocks: [
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":fire: *이벤트 종류*\n 생일, 안식 등은 홈페이지에서 가능합니다.",
      },
      accessory: {
        type: "static_select",
        placeholder: {
          type: "plain_text",
          text: "Choose Event",
          emoji: true,
        },
        options: [
          {
            text: {
              type: "plain_text",
              text: "연차",
              emoji: true,
            },
            value: "E00001",
          },
          {
            text: {
              type: "plain_text",
              text: "오후반차",
              emoji: true,
            },
            value: "E00002",
          },
          {
            text: {
              type: "plain_text",
              text: "오전반차",
              emoji: true,
            },
            value: "E00003",
          },
        ],
        action_id: EVENT_OTPION_ID,
      },
    },
    {
      text: {
        type: "mrkdwn",
        text: ":calendar: *등록일*\n 연속은 홈페이지루~",
      },
      type: "section",
      accessory: {
        type: "datepicker",
        initial_date: `${new DateObject().toShortDate()}`,
        placeholder: {
          type: "plain_text",
          text: "Select a date",
          emoji: true,
        },
        action_id: DATE_PICKER_ID,
      },
    },
    {
      type: "input",
      element: {
        type: "plain_text_input",
        multiline: true,
        action_id: DESCRIPTION_ID,
      },
      label: {
        type: "plain_text",
        text: ":clipboard: 사유",
        emoji: true,
      },
    },
  ],
};
