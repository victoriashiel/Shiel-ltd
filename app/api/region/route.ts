import { NextResponse } from "next/server";
import { regionByCountryCode } from "@/lib/regions";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const countryCode = request.headers.get("cf-ipcountry")?.toUpperCase() ?? "";
  const region = countryCode in regionByCountryCode
    ? regionByCountryCode[countryCode as keyof typeof regionByCountryCode]
    : null;

  return NextResponse.json(
    region
      ? {
          countryCode: region.countryCode,
          region: region.slug,
          name: region.name,
          path: region.path,
        }
      : { countryCode: countryCode || null, region: null },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
        Vary: "CF-IPCountry",
      },
    },
  );
}
