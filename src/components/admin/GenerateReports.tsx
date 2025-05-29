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
  const [reportData, setReportData] = useState<any | null>(null);
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
      setReportData(res.data);
      setPreviewVisible(true);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch report data", variant: "destructive" });
      setPreviewVisible(false);
    }
  };

  const handleGenerateReport = (format: string) => {
    if (!reportData) {
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
    if (!reportData) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Weekly Summary Report", 10, 15);
    doc.setFontSize(12);

    let y = 30;
    const lineHeight = 8;

    const addTextLine = (text: string) => {
      const splitText = doc.splitTextToSize(text, 180);
      doc.text(splitText, 10, y);
      y += lineHeight * splitText.length;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    };

    addTextLine(`Week period: from ${reportData.week_start} to ${reportData.week_end}`);
    addTextLine(`During this week, total login sessions recorded were: ${reportData.login_count}`);
    addTextLine(`Number of new registered users during this week: ${reportData.new_users}`);
    addTextLine(`Total practice attempts made through audio uploads: ${reportData.audio_attempts}`);
    addTextLine(`Total practice attempts made through challenge exercises: ${reportData.exercise_attempts}`);
    addTextLine(`Overall total practice attempts: ${reportData.total_attempts}`);
    addTextLine(`Challenge completion rate during the week was: ${reportData.completion_rate_percent}%`);
    addTextLine(`The average score achieved by users during practice attempts was: ${reportData.average_score}`);

    addTextLine('Top 3 most popular exercises for the week:');
    if (reportData.popular_exercises && reportData.popular_exercises.length > 0) {
      reportData.popular_exercises.forEach((ex: any, idx: number) => {
        addTextLine(`  ${idx + 1}. ${ex.title}`);
      });
    } else {
      addTextLine('  No data available.');
    }

    addTextLine('Daily active users during the week:');
    if (reportData.daily_active_users && reportData.daily_active_users.length > 0) {
      reportData.daily_active_users.forEach((day: any) => {
        addTextLine(`  ${day.day}: ${day.active_users} active users`);
      });
    } else {
      addTextLine('  No data available.');
    }

    addTextLine('Top 3 most active users during the week:');
    if (reportData.top_active_users && reportData.top_active_users.length > 0) {
      reportData.top_active_users.forEach((user: any, idx: number) => {
        addTextLine(`  ${idx + 1}. ${user.username} with ${user.attempts} practice attempts`);
      });
    } else {
      addTextLine('  No data available.');
    }

    doc.save("weekly_summary_report.pdf");
  };

  const renderReportText = () => {
    if (!reportData) return <p>No data available for preview.</p>;

    return (
      <div className="whitespace-pre-line text-gray-800 leading-relaxed">
        <p><strong>Week period:</strong> from {reportData.week_start} to {reportData.week_end}</p>
        <p><strong>Total login sessions:</strong> {reportData.login_count}</p>
        <p><strong>New registered users:</strong> {reportData.new_users}</p>
        <p><strong>Practice attempts via audio uploads:</strong> {reportData.audio_attempts}</p>
        <p><strong>Practice attempts via challenge exercises:</strong> {reportData.exercise_attempts}</p>
        <p><strong>Total practice attempts:</strong> {reportData.total_attempts}</p>
        <p><strong>Challenge completion rate:</strong> {reportData.completion_rate_percent}%</p>
        <p><strong>Average practice score:</strong> {reportData.average_score}</p>

        <p><strong>Top 3 popular exercises:</strong></p>
        <ul className="list-disc list-inside mb-4">
          {reportData.popular_exercises && reportData.popular_exercises.length > 0
            ? reportData.popular_exercises.map((ex: any, idx: number) => (
                <li key={idx}>{ex.title}</li>
              ))
            : <li>No data available.</li>
          }
        </ul>

        <p><strong>Daily active users:</strong></p>
        <ul className="list-disc list-inside mb-4">
          {reportData.daily_active_users && reportData.daily_active_users.length > 0
            ? reportData.daily_active_users.map((day: any) => (
                <li key={day.day}>{day.day}: {day.active_users} active users</li>
              ))
            : <li>No data available.</li>
          }
        </ul>

        <p><strong>Top 3 active users:</strong></p>
        <ul className="list-disc list-inside">
          {reportData.top_active_users && reportData.top_active_users.length > 0
            ? reportData.top_active_users.map((user: any, idx: number) => (
                <li key={idx}>{user.username} with {user.attempts} practice attempts</li>
              ))
            : <li>No data available.</li>
          }
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-100 shadow-md max-w-5xl mx-auto">
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
            <div className="border border-gray-300 rounded p-4 bg-white max-h-[350px] overflow-y-auto text-gray-800 leading-relaxed">
              {renderReportText()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateReports;
