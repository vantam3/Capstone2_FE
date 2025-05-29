import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileBarChart, RefreshCcw } from 'lucide-react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

const GenerateReports = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState<any[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast({ title: "Error", description: "Please login first", variant: "destructive" });
        return;
      }
      const res = await axios.get('http://localhost:8000/api/reports/weekly-summary/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReportData([res.data]); // wrap in array for table
      setPreviewVisible(true);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch report data", variant: "destructive" });
      setPreviewVisible(false);
    }
  };

  const handleGenerateReport = (format: string) => {
    if (!reportData.length) {
      toast({ title: "No data", description: "No report data to export", variant: "destructive" });
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast({ title: "Report Generated", description: `Report generated in ${format.toUpperCase()} format.` });
      if (format === 'pdf') exportPDF();
    }, 1500);
  };

  const exportPDF = () => {
    if (!reportData.length) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Weekly Summary Report", 10, 10);
    let y = 20;
    const data = reportData[0];
    for (const [key, value] of Object.entries(data)) {
      let displayValue = value;
      // If popular_exercises, only show titles joined by comma
      if (key === "popular_exercises" && Array.isArray(value)) {
        displayValue = value.map((ex: any) => ex.title).join(", ");
      }
      // Format key: replace underscores by spaces and capitalize words
      const displayKey = key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      doc.setFontSize(12);
      doc.text(`${displayKey}: ${String(displayValue)}`, 10, y);
      y += 8;
    }
    doc.save("weekly_summary_report.pdf");
  };

  const renderTable = () => {
    if (!reportData.length) return <p>No data available for preview.</p>;
    const data = reportData[0];
    const columns = Object.keys(data);

    return (
      <table className="w-full border border-gray-300 rounded-md text-left text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            {columns.map(col => (
              <th
                key={col}
                className="border px-3 py-2 font-semibold"
                style={{textTransform: "capitalize", whiteSpace: 'nowrap'}}
              >
                {col.replace(/_/g, ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            {columns.map(col => {
              let val = data[col];
              if (col === "popular_exercises" && Array.isArray(val)) {
                val = val.map((ex: any) => ex.title).join(", ");
              }
              return (
                <td key={col} className="border px-3 py-2 align-top">
                  {String(val)}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  };

  return (
  <div className="space-y-6">
    <Card className="border-purple-100 shadow-md max-w-7xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50 border-b border-purple-100">
        <CardTitle className="text-slate-800">Weekly Summary Report</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex space-x-2 mb-6">
          <Button
            onClick={() => handleGenerateReport('pdf')}
            disabled={isGenerating}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isGenerating ? (
              <>
                <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileBarChart className="h-4 w-4 mr-2" />
                Export PDF
              </>
            )}
          </Button>
        </div>

        {previewVisible && (
          <div className="overflow-auto max-h-[350px] border border-gray-300 rounded p-4 bg-white text-black">
            {renderTable()}
          </div>
        )}
      </CardContent>
    </Card>
  </div>
);
};

export default GenerateReports;
