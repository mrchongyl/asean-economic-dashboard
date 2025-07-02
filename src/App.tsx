import { useState } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import OverviewTab from './components/tabs/OverviewTab';
import GdpTab from './components/tabs/GdpTab';
import CreditCardUsageTab from './components/tabs/CreditCardUsageTab';
import InflationTab from './components/tabs/InflationTab';
import CpiTab from './components/tabs/CpiTab';
import MobileInternetBankingTab from './components/tabs/MobileInternetBankingTab';
import Footer from './components/Footer';

export type TabType = 'overview' | 'gdp' | 'creditCardUsage' | 'inflation' | 'cpi' | 'mobileInternetBanking';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'gdp' && <GdpTab />}
          {activeTab === 'creditCardUsage' && <CreditCardUsageTab />}
          {activeTab === 'inflation' && <InflationTab />}
          {activeTab === 'cpi' && <CpiTab />}
          {activeTab === 'mobileInternetBanking' && <MobileInternetBankingTab />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;