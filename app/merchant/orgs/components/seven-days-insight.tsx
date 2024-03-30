"use client";
import { BarChart } from "@tremor/react";

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export function SevenDaysInsight({
  chartdata,
}: {
  chartdata: any[] | undefined;
}) {
  return (
    <BarChart
      data={chartdata!}
      index="dow"
      categories={["上期", "本期"]}
      colors={["gray", "blue"]}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      showAnimation={true}
      onValueChange={(v) => console.log(v)}
    />
  );
}
