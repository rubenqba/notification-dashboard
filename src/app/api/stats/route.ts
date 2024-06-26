import { logger } from "@config/logger";
import { RangeSelector } from "@model/dashboard";
import { createDashboardService } from "@service/dashboard-service";
import { NextRequest, NextResponse } from "next/server";

export const dynamicParams = true // true | false,

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const range: RangeSelector = params.has("view") ? (params.get("view") as RangeSelector) : "daily";
  logger.debug("view selection: ", range);

  const svc = await createDashboardService();
  return NextResponse.json(await svc.getStats(range));
}
