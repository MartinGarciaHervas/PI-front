import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//Router Dom
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

//Actions
import { addAllCountries } from './Redux/Actions/actions'

//Views
import Landing from './views/landing/landingPage'
import Home from './views/home/home'
import Detail from './views/detail/detail'
import ActivityForm from './views/form/activityForm'
import Game from './views/game/game'
import Activities from './views/activities/Activities'

//Components
import NavBar from './components/navBar/navBar'

//Estilos
import style from './App.module.css'
import EditActivity from './views/editForm/EditForm'

function App() {

  const location = useLocation()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const access = useSelector(state => state?.user.access)

  useEffect(()=>{
    if(access){
      navigate('/home')
    }else{
      navigate('/')
    }
  },[access])

  useEffect(()=>{
    dispatch(addAllCountries())
  },[])

  return (
    <>
      <div className={style.app}>
        {location.pathname !== '/' && <NavBar />}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/form' element={<ActivityForm />} />
          <Route path='/form/:id' element={<EditActivity />}/>
          <Route path='/game' element={<Game />}/>
          <Route path='/activities' element={<Activities />} />
        </Routes>
      </div>
    </>
  )
}

export default App
