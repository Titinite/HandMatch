import type { Request, Response } from "express";

import { getHealth } from "../services/health.service.js";

export async function health(_req: Request, res: Response): Promise<void> {
  const result = await getHealth();
  res.status(result.status === "ok" ? 200 : 503).json(result);
}
