import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AllTabel from './component/AllTabel';
import Dashboard from './component/Dashboard';
import Form from './component/Student';
import Movies from './component/Movies';
import Sidebar from './component/Sidebar';
import TabelMovie from './component/MovieTable';
import Tabels from './component/StudentTabels';
import Topbar from './component/Topbar';
import UsersContext, { UserProvider } from './UserContext';
import AllForm from './component/AllForm';
import ChartList from './component/ChartList';
import ChartListView from './component/ChartListView';

import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {

  return (
    <BrowserRouter>

      <UserProvider value={{ name: "JABEZ" }} >
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Topbar />
              <div class="container-fluid">

                <Routes>
                  <Route path='/dashboard' element={<Dashboard />} />

                  <Route path='/allform' element={<AllForm />}>
                    <Route path='movie' element={<Movies />} />
                    <Route path='form' element={<Form />} />
                  </Route>
                  <Route path='/form' element={<Form />} />
                  <Route path='/movie' element={<Movies />} />

                  <Route path='/alllist' element={<AllTabel />}>
                    <Route path='student' element={<Tabels />} />
                    <Route path='tablemovie' element={<TabelMovie />} />
                  </Route>

                  <Route path='/chart' element={<ChartList />} />
                  <Route path='/chart/details/:chartId' element={<ChartListView />} />

                  
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </UserProvider>




    </BrowserRouter>


  );
}

export default App;
