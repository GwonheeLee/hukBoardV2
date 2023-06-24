import { convertObjectId, dbConnect } from "@/lib/mongodb";
import { DBEventHistory, EventHistory } from "@/models/eventHistory.model";

export async function getEventHistoryListPage(
  baseYear: string,
  pageNumber: number
): Promise<DBEventHistory[]> {
  const startDate = `${baseYear}-01-01`;
  const endDate = `${baseYear}-12-31`;

  const pageSize = 10;

  await dbConnect();

  return (
    await EventHistory.find({
      startDate: { $gte: startDate, $lte: endDate },
    })
      .sort({ startDate: "desc" })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean()
  ).map(convertObjectId);
}
