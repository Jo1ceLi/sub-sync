import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// tx sub    desc: "name | x天 | yyyy-mm-dd hh:mm:ss~yyyy-mm-dd hh:mm:ss" (UTC-0)
// tx course desc: "name | x堂 | nnnn元"
export const formatDesc = (txDesc: string): string => {
  if (txDesc.split("|").length === 3) {
    const lastPipe = txDesc.split("|").at(-1);
    // course
    if (!lastPipe || lastPipe.split("~").length === 1) {
      const courseName = txDesc.split("|").at(0);
      const session_count = txDesc.split("|").at(1);
      return `${courseName} | ${session_count}`;
    }
    // plan
    const start = new Date(lastPipe.split("~").at(0)!).toLocaleDateString();
    const end = new Date(lastPipe.split("~").at(-1)!).toLocaleDateString();
    const planName = txDesc.split("|").at(0);
    const duration = txDesc.split("|").at(1);
    return planName + " | " + duration + " | " + start + "~" + end;
  }
  // else
  return txDesc;
};
