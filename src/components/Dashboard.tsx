import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Clock, FileText } from 'lucide-react';

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
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <FileText className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-gray-500">Total Extractions</p>
              <p className="text-2xl font-semibold">{stats.totalExtractions}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <BarChart className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-semibold">{stats.successRate}%</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Clock className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-gray-500">Recent Activity</p>
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
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">{extraction.filename}</p>
                  <p className="text-sm text-gray-500">{extraction.timestamp}</p>
                </div>
              </div>
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
          ))}
        </div>
      </Card>
    </div>
  );
};