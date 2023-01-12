// https://www.youtube.com/watch?v=3yrMcx02jXs
// https://reactjs.org/docs/context.html

import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({children}) {
    const [userResponse, setUserResponse] = useState();

    return (
        <UserContext.Provider value={{userResponse, setUserResponse}}>{children}</UserContext.Provider>
    );
}

export default UserContext;