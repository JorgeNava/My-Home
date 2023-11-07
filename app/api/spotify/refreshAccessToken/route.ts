/* 
  https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
*/
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import configProvider from "../../../_libs/config-provider";

export async function GET(request: NextRequest) {
}
