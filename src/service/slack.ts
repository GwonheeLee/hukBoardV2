import { config } from "@/lib/config";
import { dbConnect } from "@/lib/mongodb";
import { EventHistory } from "@/models/eventHistory.model";
import { EventModel } from "@/models/eventModel.model";
import { Member } from "@/models/member.model";
const GMARKET_WORK_TYPE = ["H01001", "H01002"];
const EBAY_JAPAN_WORK_TYPE = ["H01101", "H01102"];

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
          {
            text: {
              type: "plain_text",
              text: "추가근무(8h)",
              emoji: true,
            },
            value: "E01001",
          },
          {
            text: {
              type: "plain_text",
              text: "추가근무(4h)",
              emoji: true,
            },
            value: "E01002",
          },
          {
            text: {
              type: "plain_text",
              text: "추가근무(2h)",
              emoji: true,
            },
            value: "E01003",
          },
          {
            text: {
              type: "plain_text",
              text: "추가근무(1h)",
              emoji: true,
            },
            value: "E01004",
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
        initial_date: "2023-08-28",
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

const VIEW_OPEN_URL = "https://slack.com/api/views.open";
const CHAT_URL = "https://slack.com/api/chat.postMessage";

export async function sendSlackChat(slackUID: string, message: string) {
  if (slackUID === "") {
    return;
  }
  fetch(CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + config.slack.botToken,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      channel: slackUID,
      text: message,
    }),
  });
}

export async function sendSlackChatCompany(workType: string, message: string) {
  if (workType === "") {
    return;
  }

  if (GMARKET_WORK_TYPE.includes(workType)) {
    await fetch(config.slack.gmarketChannel, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    });
  }

  if (EBAY_JAPAN_WORK_TYPE.includes(workType)) {
    await fetch(config.slack.ebayJapanChannel, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    });
  }
}

export async function sendSlackChatManager(teamCode: string, message: string) {
  if (teamCode === "") {
    return;
  }

  await dbConnect();

  const managers = await Member.find({ teamCode, isAdmin: true });

  for (let manager of managers) {
    await sendSlackChat(manager.slackUID, message);
  }
}

export async function sendSlackChatApproval(id: string, approvalAdmin: string) {
  await dbConnect();

  const event = await EventHistory.findById(id);

  const member = await Member.findOne({ email: event?.email });

  const eventModel = await EventModel.findOne({ eventCode: event?.eventCode });

  const message = `
  [승인 완료]
  ID : ${id}
  요청자 : ${member?.name}
  이벤트 : ${eventModel?.name}
  사유 : ${event?.description}
  일정 : ${event?.startDate} - ${event?.endDate}
  승인자 : ${approvalAdmin}
  `;

  await sendSlackChat(member?.slackUID ?? "", message);
  await sendSlackChatManager(member?.teamCode ?? "", message);
  await sendSlackChatCompany(member?.workType ?? "", message);
}
