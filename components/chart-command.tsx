"use client";

import { useEffect, useState } from "react";
import { LineChart , PieChart, BarChartBig } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { useChartType } from "@/hooks/use-chart";
// import { api } from "@/convex/_generated/api";
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js"

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


export const ChartCommand = () => {
  // const { user } = useUser();
  // const router = useRouter();
  // const documents = useQuery(api.documents.getSearch);
  const [isMounted, setIsMounted] = useState(false);
  const [openChart, setOpenChart] = useState("Line");

  // const toggle = useChartType((charts) => charts.toggle);
  const isOpen = useChartType((charts) => charts.isOpen);
  const onClose = useChartType((charts) => charts.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

const beneficios = [0,56,20,36,80,40,30,-20,25,30,12,60]
const meses =["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

const miData= {
  labels: meses,
  datasets: [
      {
        label: "beneficios",
        data: beneficios,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgb(255,99,132, 0.5)",
        pointRadiuos: 5,
        pointBorderColor: "rgb(255,99,132)",
        pointBackgroundColor: "rgb(255,99,132)"
      }
  ]
}

const chartTypes = {
  Line:"Line", 
  Bar:"Bar", 
  Doughnut:"Doughnut"
};

  const onSelect = (chartType: string) => {
    if (chartType === "Line") {
      setOpenChart("Line");
      console.log("Line")
    } else if (chartType === "Bar") {
      setOpenChart("Bar");
      console.log("Bar")
    } else if (chartType === "Doughnut") {
      setOpenChart("Doughnut");
      console.log("Doughnut")
    }

  }

  return (
    <>
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Add chart">
        <CommandItem
              key={1}
              value={`Line`}
              title={`Line`}
              onSelect={()=> onSelect("Line")}
            >
            <LineChart className="mr-2 h-4 w-4" />
            Line
        </CommandItem>
        <CommandItem
              key={2}
              value={`Bar`}
              title={`Bar`}
              onSelect={() => onSelect("Bar")}
        >
        <BarChartBig className="mr-2 h-4 w-4" />
        Bar
        </CommandItem>
        <CommandItem
              key={3}
              value={`Pie`}
              title={`Pie`}
              onSelect={() => onSelect("Doughnut")}
        >
        <PieChart className="mr-2 h-4 w-4" />
        Pie
        </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
    { openChart === chartTypes.Line && (< Line data={miData}/>
    )} 
    { openChart === chartTypes.Bar && (< Bar data={miData}/>
    )} 
    { openChart === chartTypes.Doughnut && (< Doughnut data={miData}/>
    )}
    </>
  )
}