import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppWrapper from "./components/AppWrapper"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import SignIn from "./pages/SignIn"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "react-hot-toast"
import Students from "./pages/Students"
import CreateStudent from "./pages/CreateStudent"
import UpdateStudent from "./pages/UpdateStudent"
import ViewStudent from "./pages/ViewStudent"

const queryClient = new QueryClient();

function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/signin" element={<SignIn />}/>
        <Route path="/" element={<AppWrapper />}>
          <Route index element={<Home/>} />
          <Route path="/students" element={<Students/>} />
          <Route path="/student/add" element={<CreateStudent/>} />
          <Route path="/student/update/:id" element={<UpdateStudent/>} />
          <Route path="/student/view/:id" element={<ViewStudent />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    <Toaster containerClassName="text-[0.8rem] font-outfit"/>
    </>
  )
}

export default App
