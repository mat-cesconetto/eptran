export const maskCPF = (v: string) => {
    v = v.replace(/\D/g, "")
    if (v.length <= 11) {
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}
return v
}

export const maskCEP = (v: string) => {
    v = v.replace(/\D/g, "")
    if (v.length <= 8) {
        v = v.replace(/(\d{5})(\d)/, "$1-$2")
        v = v.replace(/(\d{3})(\d)/, "$1$2")
}
return v
}


