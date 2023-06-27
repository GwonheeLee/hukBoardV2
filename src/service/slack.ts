import { config } from "@/lib/config";
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
  fetch(CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + config.slack.botToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channel: slackUID,
      message,
    }),
  });
}

// 팀 코드가 같은 관리자에게 승인요청
export function eventPostMessageForm(
  title: "삭제" | "등록",
  data: EventPostmMessage
) {
  const message = `[승인요청]
  이름 : ${data.name}
  이벤트명 : ${data.eventName}
  사유 : ${data.description}
  시작일 : ${data.startDate}
  종료일 : ${data.endDate}
  `;

  return message;
}

export function eventApprovalMessageForm(data: EventApprovalMessage) {
  const message = `[반영]
  이벤트 ID : ${data.id}
  이름 : ${data.name}
  이벤트명 : ${data.eventName}
  사유 : ${data.description}
  시작일 : ${data.startDate}
  종료일 : ${data.endDate}
  연차 : ${data.annualCount}
  사용량 : ${data.useCount + data.prevUseAnnualCount}
  `;

  return message;
}

export type EventPostmMessage = {
  name: string;
  eventName: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type EventApprovalMessage = EventPostmMessage & {
  id: string;
  annualCount: number;
  useCount: number;
  prevUseAnnualCount: number;
};
