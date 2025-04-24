'use client';

import React, { useState } from 'react';
import axios from 'axios';

// Floating components
const FloatingTech = () => (
  <div className="floating-tech absolute inset-0 overflow-hidden z-0">
    {/* Will be populated with JS */}
  </div>
);

const FloatingChip = () => (
  <div className="floating-chip absolute inset-0 overflow-hidden z-0">
    {/* Will be populated with JS */}
  </div>
);

const FloatingParticles = () => (
  <div className="floating-particles absolute inset-0 overflow-hidden z-0">
    {/* Will be populated with JS */}
  </div>
);

// Metric component
const Metric = ({ title, value, color }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="font-medium dark:text-white">{title}</span>
      <span className="font-semibold">{value}</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
      <div className={`${color} h-2.5 rounded-full`} style={{ width: value }}></div>
    </div>
  </div>
);

// ConfusionMatrix component
const ConfusionMatrix = () => (
  <div>
    <div className="grid grid-cols-3 gap-1 text-sm">
      <div className="col-start-2 text-center font-medium dark:text-white">Predicted Spam</div>
      <div className="col-start-3 text-center font-medium dark:text-white">Predicted Not Spam</div>
      <div className="row-start-2 flex items-center justify-end pr-2 font-medium dark:text-white">Actual Spam</div>
      <div className="bg-green-100 dark:bg-green-900 p-3 text-center font-semibold">4,876</div>
      <div className="bg-red-100 dark:bg-red-900 p-3 text-center font-semibold">228</div>
      <div className="row-start-3 flex items-center justify-end pr-2 font-medium dark:text-white">Actual Not Spam</div>
      <div className="bg-red-100 dark:bg-red-900 p-3 text-center font-semibold">156</div>
      <div className="bg-green-100 dark:bg-green-900 p-3 text-center font-semibold">5,321</div>
    </div>
    <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
      <p>Based on 10,581 test emails from the Enron dataset.</p>
    </div>
  </div>
);

// ComparisonTable component
const ComparisonTable = () => (
  <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
    <h4 className="text-xl font-semibold mb-3 dark:text-white">Comparison with Other Methods</h4>
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
          <tr>
            <th className="px-4 py-2">Algorithm</th>
            <th className="px-4 py-2">Accuracy</th>
            <th className="px-4 py-2">Precision</th>
            <th className="px-4 py-2">Recall</th>
            <th className="px-4 py-2">F1 Score</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'Naive Bayes', acc: '97.68%', prec: '99%', rec: '92.5%', time: '95%' },
            { name: 'SVM', acc: '98.46%', prec: '98.0%', rec: '96.2%', time: '97%' },
            { name: 'Random Forest', acc: '97.5%', prec: '99.0%', rec: '93.3%', time: '96%' },
          ].map((algo, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
              <td className="px-4 py-2 font-medium dark:text-white">{algo.name}</td>
              <td className="px-4 py-2">{algo.acc}</td>
              <td className="px-4 py-2">{algo.prec}</td>
              <td className="px-4 py-2">{algo.rec}</td>
              <td className="px-4 py-2">{algo.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
      <p>Naive Bayes offers the best balance between performance and computational efficiency for spam filtering.</p>
    </div>
  </div>
);

// PerformanceMetrics component
const PerformanceMetrics = () => (
  <section id="performance" className="py-12 bg-white dark:bg-gray-800">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold dark:text-white">Performance Metrics</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-2xl font-semibold mb-6 dark:text-white">Model Evaluation</h3>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-medium mb-4 dark:text-white">Test Dataset Results</h4>
              <div className="space-y-4">
                <Metric title="Accuracy" value="97.8%" color="bg-green-500" />
                <Metric title="Precision" value="99.2%" color="bg-blue-500" />
                <Metric title="Recall" value="92.5%" color="bg-purple-500" />
                <Metric title="F1 Score" value="95.3%" color="bg-yellow-500" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4 dark:text-white">Confusion Matrix</h4>
              <ConfusionMatrix />
            </div>
          </div>

          <ComparisonTable />
        </div>
      </div>
    </div>
  </section>
);

// Main Page component
export default function Page() {
  const [emailText, setEmailText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const classifyEmail = async () => {
    if (!emailText) return;
    setLoading(true);
    try {
      const response = await axios.post("https://email-spam-backend-6h8n.onrender.com/predict", {
        mail: emailText
      });
      setResult(response.data?.prediction);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <canvas id="matrix-rain" className="matrix-rain"></canvas>
        <div id="particles-js"></div>

        <div className="gradient-bg text-white relative overflow-hidden">
          <FloatingTech />
          <FloatingChip />
          <FloatingParticles />

          <div className="max-w-7xl mx-auto py-32 px-4 sm:py-40 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl neon-text">
              AI-Powered Email Spam Detection
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
              Protect your Message with our machine learning classifier that identifies spam messages.
            </p>
            <div className="mt-10">
              <a
                href="#demo"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 transform hover:scale-110 transition duration-300"
              >
                <i className="fas fa-play-circle mr-2"></i> Live Demo
              </a>
            </div>
          </div>

          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="grid-lines"></div>
          </div>
          <div className="floating-ai-nodes absolute inset-0 overflow-hidden z-0"></div>
          <div id="neural-network" className="absolute inset-0 overflow-hidden z-0 opacity-20"></div>
        </div>

        {/* Demo Section */}
        <div id="demo" className="py-20 bg-gray-900 bg-opacity-90 backdrop-blur-sm relative scanlines">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:text-center mb-16">
              <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">Try It Now</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                Spam Classifier
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="mb-6">
                  <label htmlFor="email-text" className="block text-sm font-medium text-gray-300">
                    Enter email content
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="email-text"
                      rows="12"
                      className="input-highlight bg-gray-800 text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-700 rounded-md p-4 border"
                      placeholder="Paste the content of an email here to check if it's spam..."
                      value={emailText}
                      onChange={(e) => setEmailText(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <button
                  onClick={classifyEmail}
                  className="cyber-glow gradient-bg text-white px-6 py-3 rounded-md text-lg font-medium hover:opacity-90 transition transform hover:scale-105 w-full flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                  ) : (
                    <i className="fas fa-search mr-2"></i>
                  )}
                  {loading ? "Checking..." : "Check for Spam"}
                </button>
              </div>

              <div>
                <div className="holographic p-8 rounded-lg h-full">
                  <h3 className="text-xl font-medium text-white mb-6">Analysis Results</h3>
                  {result ? (
                    <div id="result-container" className="text-center py-12">
                      <i className={`fas fa-envelope text-5xl mb-4 ${result === 'Spam' ? 'text-red-500' : 'text-green-400'}`}></i>
                      <h4 className={`text-3xl font-bold mb-4 ${result === 'Spam' ? 'text-red-500' : 'text-green-400'}`}>{result}</h4>
                      <p className={`text-base ${result === 'Spam' ? 'text-red-300' : 'text-green-200'}`}>
                        This email was classified as <strong>{result}</strong> by our model.
                      </p>
                    </div>
                  ) : (
                    <div id="empty-state" className="text-center py-12">
                      <i className="fas fa-envelope-open-text text-5xl text-gray-500 mb-4"></i>
                      <h4 className="text-xl font-medium text-gray-400">No email analyzed yet</h4>
                      <p className="mt-2 text-base text-gray-500">
                        Enter an email and click "Check for Spam" to see results
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <PerformanceMetrics />
      </div>
    </>
  );
}