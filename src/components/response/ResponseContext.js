// https://www.youtube.com/watch?v=3yrMcx02jXs
// https://reactjs.org/docs/context.html

import { createContext, useState } from "react";

const ResponseContext = createContext();

export function ResponseProvider({children}) {
    const [hrvResponse, setHrvResponse] = useState();

    return (
        <ResponseContext.Provider value={{hrvResponse}}>{children}</ResponseContext.Provider>
    );
}

export default ResponseContext;