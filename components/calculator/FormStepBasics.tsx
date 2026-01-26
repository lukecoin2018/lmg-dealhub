"use client";

import { InfoIcon } from "@/components/ui/InfoIcon";
import { Niche } from "@/lib/types/calculator";

interface FormStepBasicsProps {
  followers: number;
  engagementRate: number;
  niche: Niche;
  onChange: (field: string, value: any) => void;
}

export function FormStepBasics({
  followers,
  engagementRate,
  niche,
  onChange,
}: FormStepBasicsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-text-primary">Let's start with the basics</h2>
        <p className="text-text-secondary">
          Tell us about your account so we can calculate accurate rates.
        </p>
      </div>

      {/* Followers */}
      <div>
        <label className="block text-sm font-medium mb-2 text-text-primary">
          How many followers do you have?
          <InfoIcon content="Total follower count on your main platform. We'll calculate your engaged audience from this." />
        </label>
        <input
          type="number"
          min="10000"
          max="500000"
          step="1000"
          value={followers}
          onChange={(e) => onChange("followers", parseInt(e.target.value))}
          className="w-full"
          placeholder="e.g., 50000"
        />
        <p className="text-xs text-text-tertiary mt-1">
          This calculator is designed for creators with 10k-500k followers
        </p>
      </div>

      {/* Engagement Rate */}
      <div>
        <label className="block text-sm font-medium mb-2 text-text-primary">
          What's your average engagement rate?
          <InfoIcon content="(Likes + Comments + Shares) ÷ Followers × 100. Check your analytics or use an engagement calculator. This is THE most important metric." />
        </label>
        <div className="relative">
          <input
            type="number"
            min="0.5"
            max="20"
            step="0.1"
            value={engagementRate}
            onChange={(e) => onChange("engagementRate", parseFloat(e.target.value))}
            className="w-full pr-12"
            placeholder="e.g., 4.5"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
            %
          </span>
        </div>
        <div className="mt-2 flex items-center gap-4 text-xs">
          <span className="text-text-tertiary">Reference:</span>
          <span className="text-brand-pink">Excellent: &gt;5%</span>
          <span className="text-brand-blue">Good: 3-5%</span>
          <span className="text-text-secondary">Average: 2-3%</span>
        </div>
        
        {/* Engagement Rate Calculator */}
        <details className="mt-3">
          <summary className="text-sm text-brand-blue cursor-pointer hover:text-brand-pink transition-colors">
            📊 Calculate my engagement rate
          </summary>
          <div className="mt-3 p-4 bg-bg-primary rounded-lg border border-border-color">
            <p className="text-xs text-text-secondary mb-3">
              <strong>Add up the totals</strong> from your last 10-20 posts (not averages)
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-text-primary">
                  Total Likes
                  <InfoIcon content="Add up ALL likes from your last 10-20 posts. Example: Post 1 (500) + Post 2 (450) + ... = 5,000 total likes" />
                </label>
                <input
                  type="number"
                  id="calc-likes"
                  className="w-full text-sm"
                  placeholder="e.g., 5000"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-text-primary">
                  Total Comments
                  <InfoIcon content="Add up ALL comments from your last 10-20 posts. Example: Post 1 (25) + Post 2 (30) + ... = 250 total comments" />
                </label>
                <input
                  type="number"
                  id="calc-comments"
                  className="w-full text-sm"
                  placeholder="e.g., 250"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-text-primary">
                  Total Shares
                  <InfoIcon content="Add up ALL shares/saves from your last 10-20 posts. Example: Post 1 (10) + Post 2 (15) + ... = 100 total shares" />
                </label>
                <input
                  type="number"
                  id="calc-shares"
                  className="w-full text-sm"
                  placeholder="e.g., 100"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-text-primary">
                  Number of Posts
                  <InfoIcon content="How many posts did you count? Use 10-20 posts for an accurate average. More posts = more accurate." />
                </label>
                <input
                  type="number"
                  id="calc-posts"
                  className="w-full text-sm"
                  placeholder="e.g., 10"
                  defaultValue="10"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const likes = Number((document.getElementById('calc-likes') as HTMLInputElement)?.value || 0);
                const comments = Number((document.getElementById('calc-comments') as HTMLInputElement)?.value || 0);
                const shares = Number((document.getElementById('calc-shares') as HTMLInputElement)?.value || 0);
                const posts = Number((document.getElementById('calc-posts') as HTMLInputElement)?.value || 1);
                
                if (followers && posts > 0) {
                  const totalEngagement = likes + comments + shares;
                  const avgEngagementPerPost = totalEngagement / posts;
                  const rate = (avgEngagementPerPost / followers) * 100;
                  onChange("engagementRate", Number(rate.toFixed(2)));
                }
              }}
              className="mt-3 w-full py-2 px-4 bg-brand-blue text-white rounded-lg hover:opacity-90 transition-all text-sm font-medium"
            >
              Calculate & Fill
            </button>
          </div>
        </details>
      </div>

      {/* Niche */}
      <div>
        <label className="block text-sm font-medium mb-2 text-text-primary">
          What's your content niche?
          <InfoIcon content="Your niche affects brand budgets. B2B, finance, and health brands typically have larger budgets than entertainment." />
        </label>
        <select
          value={niche}
          onChange={(e) => onChange("niche", e.target.value)}
          className="w-full"
        >
          <optgroup label="Premium Niches (Higher Rates)">
            <option value="finance">Finance / Investing</option>
            <option value="b2b">B2B / SaaS</option>
            <option value="tech">Technology</option>
            <option value="health">Health / Medical</option>
          </optgroup>
          <optgroup label="Standard Niches">
            <option value="fitness">Fitness</option>
            <option value="fashion">Fashion</option>
            <option value="beauty">Beauty</option>
            <option value="lifestyle">Lifestyle</option>
          </optgroup>
          <optgroup label="Entertainment Niches">
            <option value="gaming">Gaming</option>
            <option value="entertainment">Entertainment / Memes</option>
          </optgroup>
        </select>
      </div>
    </div>
  );
}