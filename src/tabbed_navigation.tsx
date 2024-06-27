//tabbed navigation for shifting between tasks

import  { useState } from 'react'
import DataTable from "../src/data_table"
import { calculateAverages, convertRawData, getMaxMinCropsByYear } from './helper';
import rawDetails from './raw_data';
import { rawData } from '../types';


export default function Tabbed() {
  // setting active section
  const [activeTab, setActiveTab] = useState('Task 1');

  //selecting active section
  const renderContent = () => {
    switch (activeTab) {
      case 'Task 1':
        return <DataTable maxminCrops={maxminCrops} />;
        case 'Task 2':
        
          return <DataTable averages={averages}/>;
   
    }
  };

  // getting raw data
  const elements: rawData[] = rawDetails;
  //altering raw data to parse empty string as 0
  const data = convertRawData(elements);

  // get data for task 1
    const maxminCrops = getMaxMinCropsByYear(data);
    // get data for task 2
  const averages = calculateAverages(data);
  
  return (
    <div className="tab-container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'Task 1' ? 'active' : ''}`}
          onClick={() => setActiveTab('Task 1')}
        >
          Task 1
        </button>
        <button
          className={`tab ${activeTab === 'Task 2' ? 'active' : ''}`}
          onClick={() => setActiveTab('Task 2')}
        >
          Task 2
        </button>
       
      </div>
      <div className="content">
        {renderContent()}
        
      </div>
    </div>
  );
}