/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Table from '../../components/Table';
import Slider from '../../components/Slider';
import WEBSOCKET_SERVER from '../../websocketConfig';

interface UserData {
  userId: string;
  username: string;
  avatar: string,
  email: string,
  score: number;
}

interface TabExchange {
  leaderboard: () => void;
  settings: () => void;
}

const Board = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [limits, setLimits] = useState<number>(10);
  const [selectedTab, setSelectedTab] = React.useState('leaderboard');
  const [socket, setSocket] = useState<Socket | null>(null);

  const sortData = (newData: UserData) => {
    setData((prevData) => {
      const updatedData = [...prevData, newData];
      const sortedData = updatedData.sort((a, b) => b.score - a.score);
      const topNData = sortedData.slice(0, limits);

      return topNData;
    });
  }

  const tabExchange:TabExchange = {
    'leaderboard': function() {
      socket && socket.off('userData'); 
      socket && socket.on('userData', (newData: UserData) => sortData(newData))
    },
    'settings': function() {
      socket && socket.off('userData')
    }
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    tabExchange[newValue as keyof TabExchange]()
    setSelectedTab(newValue);
  };


  useEffect(() => {
    const newSocket: Socket = io(WEBSOCKET_SERVER);
    setSocket(newSocket);

    return () => {
      socket && socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && selectedTab === 'leaderboard') {
      socket.on('userData', (newData: UserData) => {
        sortData(newData)
      });
    }

    return () => {
      socket && socket.off('userData');
    };
  }, [socket, selectedTab])

  const deleteRow = (userId:string) => {
    setData((prevData) => prevData.filter((row) => row.userId !== userId));
  }

  const changeLimits = (limit:number) => {
    setLimits(limit)
    setData((prevData) => {
      const topNData = prevData.slice(0, limit);
      return topNData;
    })
  } 

  return (
    <Box sx={{ width: '90%', p: 2, m:5 }}>
      <TabContext value={selectedTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label='lab API tabs example'>
            <Tab label='LEADERBOARD' value='leaderboard' />
            <Tab label='SETTINGS' value='settings' />
          </TabList>
        </Box>
        <TabPanel value='leaderboard'>
          <Table 
            data={data} 
            deleteRow={deleteRow}  
          />
        </TabPanel>
        <TabPanel value='settings'>
          <Slider
            limits={limits}
            changeLimits={changeLimits}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Board;
export type { UserData }
