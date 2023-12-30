import React,{useState,useEffect,useMemo} from 'react'
import { MaterialReactTable } from 'material-react-table';
import { getuser } from './request'
import '../Style/Dashboard.css'
import useApi from '../Custom/useApi';

function Overview() {
  const [allUsers, setAllUsers] = useState(0)
  const [subscribedUsers, setSubscribedUsers] = useState(0)
  const [amount, setAmount] = useState(0)
  const {get} = useApi()

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
      All_Users: allUsers,
      Subscribed_users :subscribedUsers,
      Amount: `₹ ${amount}`
    }
  ]
 
  const columns = useMemo(
    () => [
      
      {
        accessorKey: 'All_Users', //normal accessorKey
        header: 'All_Users',
        size: 200,
      },
      {
        accessorKey: 'Subscribed_users', //normal accessorKey
        header: 'Subscribed_users',
        size: 200,
      },
      {
        accessorKey: 'Amount', //normal accessorKey
        header: 'Total Collection',
        size: 200,
      },
    ],
    []
  )
  return (
    <div className='table.container'>
      <MaterialReactTable columns={columns} data={data} enablePagination={false}/>
    </div>
  )
}

export default Overview