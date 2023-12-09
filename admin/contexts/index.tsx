import { createContext, useEffect, useState } from 'react'
import { FC, PropsWithChildren } from 'react'
import { useStorage } from "./useStorage";
import { signIn } from 'next-auth/react'
import SiteApis from "./SiteApis";
import { axiosInstance } from "./SiteApis";

interface MainContextProps {
  settings: any,
  setSettings: (values: any) => Promise<void>,
  isLoading: boolean,
  token: any,
  user: any,
  login: (params: object) => Promise<void>,
  logout: () => Promise<void>,
  updateUser: any,
}

export const MainContext = createContext<MainContextProps>({
  settings: {},
  setSettings: () => Promise.resolve(),
  isLoading: false,
  token: null,
  user: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  updateUser: () => { },
})

export const MainContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { getItem, setItem, removeItem } = useStorage();
  const [settings, setSettings] = useState({})
  const [isLoading, setIsLoading] = useState<any>(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    getItem('settings').then((value: any) => {
      setSettings(value ? value : {})
    });
    getItem('token').then((value: any) => {
      setToken(value)
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${value}`
    });
    getItem('user').then((value: any) => {
      setUser(value)
    });
  }, []);

  const handleSettings = async (value: any) => {
    setItem('settings', { ...value });
    return setSettings({ ...value })
  }
  const loginPress = async (params: any, props: any) => {
    setIsLoading(true)
    signIn("credentials", {
      ...params,
      redirect: true,
      callbackUrl: props?.callbackUrl ?? "http://localhost:3000/admin"
    })
    // const response: any = await SiteApis.login(params);
    // if (!response?.error) {
    //   setItem('token', response?.Authorization);
    //   setItem('user', response);
    //   signIn()
    //   setUser(response)
    // }
    setIsLoading(false)
  }
  const updateUser = async () => {
    const response: any = await SiteApis.getSingleDataApi({ doctype: "User", name: user?.email }, { whitelist: true });
    if (!response?.error) {
      setItem('user', response);
      setUser(response)
    }
  }
  const logout = async () => {
    setToken(null)
    setUser(null)
    removeItem('token');
    removeItem('user');
    setUser(null)
  }

  return (
    <MainContext.Provider value={{ settings, setSettings: handleSettings, isLoading, token, user, updateUser, login: loginPress, logout }}>
      {children}
    </MainContext.Provider>
  )
}