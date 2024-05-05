"use server";

import { db } from "@/db/client";
import { employees } from "@/db/schema";
import { eq } from "drizzle-orm";
