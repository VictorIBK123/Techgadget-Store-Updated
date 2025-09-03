import React, { createContext, Dispatch, SetStateAction, useRef } from 'react';
type categoriesType={name: string, key: string, img_url: string}[]
type setCategoriesType = Dispatch<SetStateAction<{name: string, key: string, img_url: string}[]>>
interface valuesType{
    address1:string, 
    address2:string, 
    city: string, 
    country:string, 
    dateOfBirth: string, 
    firstName:string, 
    lastName: string, 
    state: string, 
    zip:string, 
}
export const AllUserDetails = createContext<{values: valuesType, setValues: Dispatch<SetStateAction<valuesType>>  }|undefined>(undefined)
export const UserDetails = createContext<{userEmail:string|undefined, setUserEmail: Dispatch<SetStateAction<string|undefined>>    }|undefined>(undefined);
export const CategoriesContext = createContext<{categoriesGlobal: categoriesType, setCategoriesGlobal: setCategoriesType}|undefined>(undefined)