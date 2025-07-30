import { claims } from "./s3data"
import { processClaimsData } from "./dataProcessor"

export const claimsData = processClaimsData(claims)
