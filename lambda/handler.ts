import { InvocationType, Lambda, LambdaClient } from "@aws-sdk/client-lambda";
import { S3Client, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { APIGatewayProxyResult, APIGatewayEvent, S3Event } from "aws-lambda";
import { uuid } from "uuidv4";

const s3Client = new S3Client({
  region: process.env.REGION,
});
const s3 = new S3({
  region: process.env.REGION,
});
const lambda = new Lambda({
  region: process.env.REGION,
});

export const generateUploadEndpoint = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.body)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "missing body" }),
    };

  let body: any;

  try {
    body = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "invalid body (JSON)" }),
    };
  }

  if (!body.type)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "missing type in body" }),
    };

  let keyPrefix: "codes" | "images";
  let maxSize: number;

  if (body.type === "code") {
    keyPrefix = "codes";
    maxSize = 10 * 1024; // 10KB
  } else if (body.type === "image") {
    keyPrefix = "images";
    maxSize = 10 * 1024 * 1024; // 10MB
  } else
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "invalid type in body (either code or image)",
      }),
    };

  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: process.env.BUCKET!,
    Key: `${keyPrefix}/${uuid()}`,
    Conditions: [["content-length-range", 0, maxSize]],
    Expires: 300,
  });

  return {
    statusCode: 201,
    body: JSON.stringify({
      url,
      fields,
    }),
  };
};

export const triggerCodeHandler = async (event: S3Event): Promise<void> => {
  await Promise.all(
    event.Records.map((record) =>
      lambda.invoke({
        FunctionName: process.env.CODE_HANDLER,
        InvocationType: InvocationType.Event,
        Payload: Buffer.from(JSON.stringify({ key: record.s3.object.key })),
      })
    )
  );
};

export const triggerImageHandler = async (event: S3Event): Promise<void> => {
  await Promise.all(
    event.Records.map((record) =>
      lambda.invoke({
        FunctionName: process.env.IMAGE_HANDLER,
        InvocationType: InvocationType.Event,
        Payload: Buffer.from(JSON.stringify({ key: record.s3.object.key })),
      })
    )
  );
};

export const handleCode = async (event: { key: string }): Promise<void> => {
  if (!event.key) return;

  const output = await s3.getObject({
    Bucket: process.env.BUCKET,
    Key: event.key,
  });

  if (!output.Body) return;

  const code = output.Body.toString();
};
