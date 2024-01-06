import React,{useState,useEffect,useMemo} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { getuser } from './request'
import '../Style/Dashboard.css'
import {get} from '../Custom/useApi';

function Overview() {
  const [allUsers, setAllUsers] = useState(0)
  const [subscribedUsers, setSubscribedUsers] = useState(0)
  const [amount, setAmount] = useState(0)

  useEffect(()=>{
    const getallUser = ()=>{
      get(`${getuser.getallUser}`).then((res)=>{
        setAllUsers(res.data.count)
      }).catch(err=>{
        throw err
      })
    }
    const getSubscribed = () => {
      get(`${getuser.getSubscribedUser}`).then((res)=>{
        setSubscribedUsers(res.data.count)
      }).catch(err=>{
        throw err
      })
  }
    const getAmount = () => {
      get(`${getuser.getAmount}`).then((res)=>{
        setAmount(res.data.amount)
      }).catch(err=>{
        throw err
      })
    }
    getallUser()
    getSubscribed()
    getAmount()
  }
  ,[])
  const data = [
    { 
      id: 1,
      All_Users: allUsers,
      Subscribed_users :subscribedUsers,
      Amount: `₹ ${amount}`
    }
  ]
 
  const columns = useMemo(
    () => [
      
      {
        field: 'All_Users', //normal accessorKey
        headerName: 'All_Users',
        width: 200,
      },
      {
        field: 'Subscribed_users', //normal accessorKey
        headerName: 'Subscribed_users',
        width: 200,
      },
      {
        field: 'Amount', //normal accessorKey
        headerName: 'Total Collection',
        width: 200,
      },
    ],
    []
  )
  return (
    <div className='table.container'>
      <DataGrid
      sx={{color: '#000', backgroundColor: '#f0f0f0'}}
       rows={data}
       columns={columns}
       setSelectrdRowv={false}
      />
    </div>
  )
}

export default Overview