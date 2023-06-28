import { config } from "@/lib/config";
import { dbConnect } from "@/lib/mongodb";
import { EventHistory } from "@/models/eventHistory.model";
import { EventModel } from "@/models/eventModel.model";
import { Member } from "@/models/member.model";
const GMARKET_WORK_TYPE = ["H01001", "H01002"];
const EBAY_JAPAN_WORK_TYPE = ["H01101", "H01102"];

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
  // await sendSlackChatCompany(member?.workType ?? "", message);
}
