export const desktopOS = [
    {
      label: 'Feminino',
      value: 72.72,
      color: '#FA85CB'
    },
    {
      label: 'Masculino',
      value: 16.38,
      color: '#617CDC'
    },
    {
      label: 'Nao declarado',
      value: 4.65,
      color: '#C7C7C7'
    
    },
  ];
  

  
  export const platforms = [
    {
      label: 'Mobile',
      value: 59.12,
    },
    {
      label: 'Desktop',
      value: 40.88,
    },
  ];
  
  const normalize = (v: number, v2: number) => Number.parseFloat(((v * v2) / 100).toFixed(2));
  
  export const mobileAndDesktopOS = [

    ...desktopOS.map((v) => ({
      ...v,
      label: v.label === 'Other' ? 'Other (Desktop)' : v.label,
      value: normalize(v.value, platforms[1].value),
    })),
  ];
  
  export const valueFormatter = (item: { value: number }) => `${item.value}%`;