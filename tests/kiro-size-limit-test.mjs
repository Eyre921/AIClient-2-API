/**
 * Binary search for AWS CodeWhisperer (Kiro) max request body size limit.
 * Usage: node tests/kiro-size-limit-test.mjs
 */
import { randomUUID } from 'crypto';

const CREDS = {
  refreshToken: "aorAAAAAGoPT70eCRM5rADe6ncPHM7nTHAQg7H1vZpqsp40D1UUhSJk9XdL1w8epTAF04dvXiR436XhJ7JLDI5rpcBkc0:MGUCMECPgnIqLAU8niX75Ou5b1fsBnD8B90O52jdmuGSVdsP4KnZH1iMFsEUAXwLASn3PQIxAMjofsFowGC+DOU5KAY9gwUdd0rfJcQnLcPAC8R0wS2ZpMvTTDY2ii//DWwY2+IHJg",
  clientId: "-xgfUgsYj17ySIGTuBb6UnVzLWVhc3QtMQ",
  clientSecret: "eyJraWQiOiJrZXktMTU2NDAyODA5OSIsImFsZyI6IkhTMzg0In0.eyJzZXJpYWxpemVkIjoie1wiY2xpZW50SWRcIjp7XCJ2YWx1ZVwiOlwiLXhnZlVnc1lqMTd5U0lHVHVCYjZVblZ6TFdWaGMzUXRNUVwifSxcImlkZW1wb3RlbnRLZXlcIjpudWxsLFwidGVuYW50SWRcIjpudWxsLFwiY2xpZW50TmFtZVwiOlwiS2lybyBJREVcIixcImJhY2tmaWxsVmVyc2lvblwiOm51bGwsXCJjbGllbnRUeXBlXCI6XCJQVUJMSUNcIixcInRlbXBsYXRlQXJuXCI6bnVsbCxcInRlbXBsYXRlQ29udGV4dFwiOm51bGwsXCJleHBpcmF0aW9uVGltZXN0YW1wXCI6MTc3OTM4ODMyMS4zMTM2MzE4MDgsXCJjcmVhdGVkVGltZXN0YW1wXCI6MTc3MTYxMjMyMS4zMTM2MzE4MDgsXCJ1cGRhdGVkVGltZXN0YW1wXCI6MTc3MTYxMjMyMS4zMTM2MzE4MDgsXCJjcmVhdGVkQnlcIjpudWxsLFwidXBkYXRlZEJ5XCI6bnVsbCxcInN0YXR1c1wiOm51bGwsXCJpbml0aWF0ZUxvZ2luVXJpXCI6bnVsbCxcImVudGl0bGVkUmVzb3VyY2VJZFwiOm51bGwsXCJlbnRpdGxlZFJlc291cmNlQ29udGFpbmVySWRcIjpudWxsLFwiZXh0ZXJuYWxJZFwiOm51bGwsXCJzb2Z0d2FyZUlkXCI6bnVsbCxcInNjb3Blc1wiOlt7XCJmdWxsU2NvcGVcIjpcImNvZGV3aGlzcGVyZXI6Y29tcGxldGlvbnNcIixcInN0YXR1c1wiOlwiSU5JVElBTFwiLFwiYXBwbGljYXRpb25Bcm5cIjpudWxsLFwiZnJpZW5kbHlJZFwiOlwiY29kZXdoaXNwZXJlclwiLFwidXNlQ2FzZUFjdGlvblwiOlwiY29tcGxldGlvbnNcIixcInR5cGVcIjpcIkltbXV0YWJsZUFjY2Vzc1Njb3BlXCIsXCJzY29wZVR5cGVcIjpcIkFDQ0VTU19TQ09QRVwifSx7XCJmdWxsU2NvcGVcIjpcImNvZGV3aGlzcGVyZXI6YW5hbHlzaXNcIixcInN0YXR1c1wiOlwiSU5JVElBTFwiLFwiYXBwbGljYXRpb25Bcm5cIjpudWxsLFwiZnJpZW5kbHlJZFwiOlwiY29kZXdoaXNwZXJlclwiLFwidXNlQ2FzZUFjdGlvblwiOlwiYW5hbHlzaXNcIixcInR5cGVcIjpcIkltbXV0YWJsZUFjY2Vzc1Njb3BlXCIsXCJzY29wZVR5cGVcIjpcIkFDQ0VTU19TQ09QRVwifSx7XCJmdWxsU2NvcGVcIjpcImNvZGV3aGlzcGVyZXI6Y29udmVyc2F0aW9uc1wiLFwic3RhdHVzXCI6XCJJTklUSUFMXCIsXCJhcHBsaWNhdGlvbkFyblwiOm51bGwsXCJmcmllbmRseUlkXCI6XCJjb2Rld2hpc3BlcmVyXCIsXCJ1c2VDYXNlQWN0aW9uXCI6XCJjb252ZXJzYXRpb25zXCIsXCJ0eXBlXCI6XCJJbW11dGFibGVBY2Nlc3NTY29wZVwiLFwic2NvcGVUeXBlXCI6XCJBQ0NFU1NfU0NPUEVcIn1dLFwiYXV0aGVudGljYXRpb25Db25maWd1cmF0aW9uXCI6bnVsbCxcInNoYWRvd0F1dGhlbnRpY2F0aW9uQ29uZmlndXJhdGlvblwiOm51bGwsXCJlbmFibGVkR3JhbnRzXCI6bnVsbCxcImVuZm9yY2VBdXRoTkNvbmZpZ3VyYXRpb25cIjpudWxsLFwib3duZXJBY2NvdW50SWRcIjpudWxsLFwic3NvSW5zdGFuY2VBY2NvdW50SWRcIjpudWxsLFwidXNlckNvbnNlbnRcIjpudWxsLFwibm9uSW50ZXJhY3RpdmVTZXNzaW9uc0VuYWJsZWRcIjpudWxsLFwiYXNzb2NpYXRlZEluc3RhbmNlQXJuXCI6bnVsbCxcImlzRXhwaXJlZFwiOmZhbHNlLFwiaXNCYWNrZmlsbGVkXCI6ZmFsc2UsXCJoYXNJbml0aWFsU2NvcGVzXCI6dHJ1ZSxcImFyZUFsbFNjb3Blc0NvbnNlbnRlZFRvXCI6ZmFsc2UsXCJncm91cFNjb3Blc0J5RnJpZW5kbHlJZFwiOntcImNvZGV3aGlzcGVyZXJcIjpbe1wiZnVsbFNjb3BlXCI6XCJjb2Rld2hpc3BlcmVyOmNvbnZlcnNhdGlvbnNcIixcInN0YXR1c1wiOlwiSU5JVElBTFwiLFwiYXBwbGljYXRpb25Bcm5cIjpudWxsLFwiZnJpZW5kbHlJZFwiOlwiY29kZXdoaXNwZXJlclwiLFwidXNlQ2FzZUFjdGlvblwiOlwiY29udmVyc2F0aW9uc1wiLFwidHlwZVwiOlwiSW1tdXRhYmxlQWNjZXNzU2NvcGVcIixcInNjb3BlVHlwZVwiOlwiQUNDRVNTX1NDT1BFXCJ9LHtcImZ1bGxTY29wZVwiOlwiY29kZXdoaXNwZXJlcjphbmFseXNpc1wiLFwic3RhdHVzXCI6XCJJTklUSUFMXCIsXCJhcHBsaWNhdGlvbkFyblwiOm51bGwsXCJmcmllbmRseUlkXCI6XCJjb2Rld2hpc3BlcmVyXCIsXCJ1c2VDYXNlQWN0aW9uXCI6XCJhbmFseXNpc1wiLFwidHlwZVwiOlwiSW1tdXRhYmxlQWNjZXNzU2NvcGVcIixcInNjb3BlVHlwZVwiOlwiQUNDRVNTX1NDT1BFXCJ9LHtcImZ1bGxTY29wZVwiOlwiY29kZXdoaXNwZXJlcjpjb21wbGV0aW9uc1wiLFwic3RhdHVzXCI6XCJJTklUSUFMXCIsXCJhcHBsaWNhdGlvbkFyblwiOm51bGwsXCJmcmllbmRseUlkXCI6XCJjb2Rld2hpc3BlcmVyXCIsXCJ1c2VDYXNlQWN0aW9uXCI6XCJjb21wbGV0aW9uc1wiLFwidHlwZVwiOlwiSW1tdXRhYmxlQWNjZXNzU2NvcGVcIixcInNjb3BlVHlwZVwiOlwiQUNDRVNTX1NDT1BFXCJ9XX0sXCJzaG91bGRHZXRWYWx1ZUZyb21UZW1wbGF0ZVwiOnRydWUsXCJoYXNSZXF1ZXN0ZWRTY29wZXNcIjpmYWxzZSxcImNvbnRhaW5zT25seVNzb1Njb3Blc1wiOmZhbHNlLFwic3NvU2NvcGVzXCI6W10sXCJpc1YxQmFja2ZpbGxlZFwiOmZhbHNlLFwiaXNWMkJhY2tmaWxsZWRcIjpmYWxzZSxcImlzVjNCYWNrZmlsbGVkXCI6ZmFsc2UsXCJpc1Y0QmFja2ZpbGxlZFwiOmZhbHNlfSJ9.dm6qjjFewgu0lk9vVOMob71Y1B6JwW7DBNS03knnNGjO5oQQL9zrQJD84sD15rKH",
  region: "us-east-1",
};

const REFRESH_URL = `https://oidc.${CREDS.region}.amazonaws.com/token`;
const API_URL = `https://q.${CREDS.region}.amazonaws.com/generateAssistantResponse`;
const MODEL_ID = "CLAUDE_SONNET_4_5_20250929_V1_0";
const KIRO_VER = "0.8.140-016250152d2327a5dda19a1892869f11ecbdeb0bbde2dc00713d11b61ca65c66";

async function refreshToken() {
  const res = await fetch(REFRESH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refreshToken: CREDS.refreshToken,
      clientId: CREDS.clientId,
      clientSecret: CREDS.clientSecret,
      grantType: 'refresh_token',
    }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Token refresh failed ${res.status}: ${text}`);
  const data = JSON.parse(text);
  console.log(`Token refreshed, expires in ${data.expiresIn}s`);
  return data.accessToken;
}

function buildBody(paddingBytes) {
  const padding = 'A'.repeat(paddingBytes);
  return JSON.stringify({
    conversationState: {
      chatTriggerType: 'MANUAL',
      conversationId: randomUUID(),
      history: [
        { userInputMessage: { content: padding, modelId: MODEL_ID, origin: 'AI_EDITOR' } },
        { assistantResponseMessage: { content: 'ok' } },
      ],
      currentMessage: {
        userInputMessage: { content: 'hi', modelId: MODEL_ID, origin: 'AI_EDITOR' },
      },
    },
  });
}

async function probe(token, paddingBytes) {
  const body = buildBody(paddingBytes);
  const bodySize = Buffer.byteLength(body);
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'amz-sdk-request': 'attempt=1; max=1',
      'amz-sdk-invocation-id': randomUUID(),
      'x-amzn-kiro-agent-mode': 'vibe',
      'x-amz-user-agent': `aws-sdk-js/1.0.0 KiroIDE-${KIRO_VER}`,
      'user-agent': `aws-sdk-js/1.0.0 ua/2.1 os/linux#6.8.0-48-generic lang/js md/nodejs#20.20.0 api/codewhispererruntime#1.0.0 m/E KiroIDE-${KIRO_VER}`,
    },
    body,
  });
  // drain response
  await res.text();
  return { status: res.status, bodySize };
}

async function main() {
  const token = await refreshToken();

  // Sanity check: tiny request should succeed (non-400)
  const { status: s0, bodySize: b0 } = await probe(token, 10);
  console.log(`Baseline  padding=10      bodySize=${b0}  status=${s0}`);
  if (s0 === 400) {
    console.error('Baseline request returned 400 — check request format or credentials.');
    process.exit(1);
  }

  // Sanity check: 2MB should fail
  const { status: s1, bodySize: b1 } = await probe(token, 2 * 1024 * 1024);
  console.log(`Upper     padding=2MB     bodySize=${b1}  status=${s1}`);
  if (s1 !== 400) {
    console.log('2MB request succeeded — limit is higher than 2MB, expand search range.');
    process.exit(0);
  }

  // Binary search (1KB precision)
  let lo = 10;
  let hi = 2 * 1024 * 1024;
  let lastGoodBodySize = b0;

  console.log('\nBinary searching...');
  while (hi - lo > 1024) {
    const mid = Math.floor((lo + hi) / 2);
    const { status, bodySize } = await probe(token, mid);
    const tag = status === 400 ? 'FAIL' : 'OK  ';
    console.log(`  [${tag}] padding=${String(mid).padStart(8)}  bodySize=${String(bodySize).padStart(9)}  status=${status}`);
    if (status === 400) {
      hi = mid;
    } else {
      lo = mid;
      lastGoodBodySize = bodySize;
    }
  }

  console.log(`\n=== Result ===`);
  console.log(`Max accepted body size: ~${lastGoodBodySize} bytes (${(lastGoodBodySize / 1024).toFixed(1)} KB)`);
  console.log(`Recommended limit in code: ${Math.floor(lastGoodBodySize * 0.9)} bytes (~${(lastGoodBodySize * 0.9 / 1024).toFixed(0)} KB, 10% safety margin)`);
}

main().catch(err => { console.error(err); process.exit(1); });
