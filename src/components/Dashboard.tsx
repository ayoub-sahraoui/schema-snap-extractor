import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Clock, FileText, CheckCircle2, XCircle } from 'lucide-react';

interface DashboardProps {
  stats: {
    totalExtractions: number;
    successRate: number;
    recentExtractions: Array<{
      id: string;
      filename: string;
      timestamp: string;
      status: 'success' | 'failed';
    }>;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Extractions</p>
              <p className="text-2xl font-semibold">{stats.totalExtractions}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-semibold">{stats.successRate.toFixed(1)}%</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Recent Activity</p>
              <p className="text-2xl font-semibold">
                {stats.recentExtractions.length} files
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Extractions</h3>
        <div className="space-y-4">
          {stats.recentExtractions.map((extraction) => (
            <div
              key={extraction.id}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{extraction.filename}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(extraction.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {extraction.status === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    extraction.status === 'success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {extraction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};