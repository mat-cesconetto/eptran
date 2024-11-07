import useSWR from 'swr'

interface DayAccess {
  day: string
  accesses: number
}

interface WeeklyAccessByEducation {
  escolaridade: string
  accessesByDay: DayAccess[]
}

const fetcher = (url: string) => 
  fetch(`http://localhost:3333${url}`).then((res) => res.json())

export function useCharts() {
  const { data, isLoading } = useSWR<WeeklyAccessByEducation[]>(
    '/stats/accesses/weekly',
    fetcher
  )

  const formattedEducationLabels = {
    ENSINO_FUNDAMENTAL_I: 'Séries iniciais',
    ENSINO_FUNDAMENTAL_II: 'Séries Finais',
    ENSINO_MEDIO: 'Ensino Médio',
    OUTROS: 'Outros',
  }

  const weeklyAccessByEducation = data?.map((item) => ({
    name: formattedEducationLabels[item.escolaridade as keyof typeof formattedEducationLabels],
    Domingo: item.accessesByDay[0].accesses,
    Segunda: item.accessesByDay[1].accesses,
    Terça: item.accessesByDay[2].accesses,
    Quarta: item.accessesByDay[3].accesses,
    Quinta: item.accessesByDay[4].accesses,
    Sexta: item.accessesByDay[5].accesses,
    Sábado: item.accessesByDay[6].accesses,
  }))

  return {
    weeklyAccessByEducation,
    isLoading,
  }
}