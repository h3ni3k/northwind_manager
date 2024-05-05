"use server";

import { db } from "@/db/client";
import { employeesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
