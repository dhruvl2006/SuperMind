import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const SocialMetricsDashboard = ({ Stats }: { Stats?: { likes: number[], comments: number[], shares: number[], avg_sentiment_score: number[] } }) => {
  if (!Stats) return null;
  const data = Stats
  //
  // Transform the data for Recharts
  const transformedData = data.likes.map((_, index) => ({
    post: `Post ${index + 1}`,
    likes: (data.likes[index]),
    shares: (data.shares[index]),
    comments: (data.comments[index]),
    sentiment: (data.avg_sentiment_score[index])
  }));

  return (
    <div className="space-y-8">
      {/* Engagement Metrics Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Post Engagement Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transformedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="post" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="likes" fill="#8884d8" name="Likes" />
                <Bar dataKey="shares" fill="#82ca9d" name="Shares" />
                <Bar dataKey="comments" fill="#ffc658" name="Comments" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Sentiment Score Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transformedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="post" />
                <YAxis domain={[-1, 1]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sentiment"
                  stroke="#ff7300"
                  name="Sentiment Score"
                  dot={{ fill: '#ff7300' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMetricsDashboard;
