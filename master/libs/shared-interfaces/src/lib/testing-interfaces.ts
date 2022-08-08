import { of } from "rxjs"

export const matdialogTesting = {
    matdialog: {
        open(component: any, data: any) {
            return {
                afterClosed() {
                    return of({})
                }
            }
        }
    },
    afterClosedMockTrue: {
        afterClosed() {
            return of(true)
        }
    },
    afterClosedMockFalse: {
        afterClosed() {
            return of(false)
        }
    }
}

export const snackbarTesting={
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    openFromComponent(component:any,data:any){
        console.log("filler");
    }
}


export const routerMock={
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigate(path:any){
        console.log("filler");
    }
}

export const httpMock = {
    post(url: string, body: any) {
        return of({})
    }
}
