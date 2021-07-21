import { useEffect } from "react"
import { Can } from "../components/Can"
import { useAuth } from "../contexts/AuthContext"
import { setupAPIClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { user } = useAuth()

  useEffect(() => {
    api.get('/me')
    .then(response => console.log(response))
  }, [])

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      
      <Can permissions={['metrics.list']} roles={['editor', 'administrator']}>
        <div>Métricas</div>
      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async(ctx) => {
  const apiClient = setupAPIClient(ctx);
  await apiClient.get('/me');

  return {
    props: {}
  }
})