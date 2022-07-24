import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { MapApiReserveResponse } from '@master/shared-interfaces';

@Injectable()
export class ThingsboardThingsboardAssetService {
  constructor(private httpService: HttpService) {}

  private ThingsBoardURL = process.env.TB_URL || "http://localhost:8080/api";
  private headersReq = {};

  setToken(token: string) {
    this.headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async getAssetIDs(customerID: string): Promise<assetResponse> {
    const resp = await firstValueFrom(
      this.httpService.get(
        this.ThingsBoardURL + '/customer/' + customerID + '/assets?pageSize=100&page=0',
        {
          headers: this.headersReq,
        }
      )
    ).catch((error) => {
      if (error.response == undefined) return error.code;
        return error;
    });
    if(resp == "ECONNREFUSED")
    return {
      status : 500,
      explanation : resp,
    } 
    else if(resp.status != 200) {
      return {
      status : resp.response.status,
      explanation : resp.response.data.message,
      }
    }
    return {
      status : resp.status,
      explanation : "ok",
      data : {
        assets : this.processAssetIDS(resp['data'])
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  processAssetIDS(data): assetID[] {
    if(data == null || data == undefined) return []
    const ret = new Array<assetID>();
    data['data'].forEach((element) => {
      ret.push({
        name: element['name'],
        type: element['type'],
        EntityID: element['id']['id'],
      });
    });
    return ret;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*async getReservePerimeter(entityIdOfAsset: string): Promise<MapApiReserveResponse> {
    const resp = await firstValueFrom(
      this.httpService.get(
        this.ThingsBoardURL +
          '/plugins/telemetry/ASSET/' +
          entityIdOfAsset +
          '/values/attributes',
        {
          headers: this.headersReq,
        }
      )
    ).catch((error) => {
      if (error.response == undefined) return error.code;
        return error.response;
    });

    if(resp == "ECONNREFUSED")
    return {
      code: 500,
      status: 'failure',
      explanation: 'connection failure',
    } 
    if (resp.status == 400) {
      return {
        code: 400,
        status: 'failure',
        explanation: 'server failure',
      };
    } else if (resp.status == 401) {
      return {
        code: 401,
        status: 'permissions',
        explanation: 'credentials not correct for this action',
      };
    } else if(resp.status == 404) {
      return {
        code: 404,
        status: 'not found',
        explanation: 'no reserve set',
      };
    }
    else {
      let ret = {
        code: 200,
        status: 'found',
        explanation: 'reserve set',
      };
        resp['data'].forEach((element) => {
          if (element['key'] == 'reservePerimeter') ret = element;
        });
        return ret;
      }
  }*/

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface assetResponse {
  status: number,
  explanation: string,
  data? : {
    assets? : assetID[],
  }
}

export interface assetID {
  name: string;
  type: string;
  EntityID: string;
}
