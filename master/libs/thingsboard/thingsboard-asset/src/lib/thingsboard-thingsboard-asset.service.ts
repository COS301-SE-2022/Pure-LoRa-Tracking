import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { MapApiReserveResponse } from '@master/shared-interfaces';

@Injectable()
export class ThingsboardThingsboardAssetService {
  constructor(private httpService: HttpService) {}

  private BaseUrl = 'http://localhost:9090/api/';
  private headersReq = {};

  setToken(token: string) {
    this.headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
  }

  async getAssetIDs(customerID: string): Promise<assetID[]> {
    const resp = await firstValueFrom(
      this.httpService.get(
        this.BaseUrl + 'customer/' + customerID + '/assets?pageSize=30&page=0',
        {
          headers: this.headersReq,
        }
      )
    ).catch((error) => {
      if (error.response == undefined) return { status: 400 };
      if (error.response.status == 400) {
        return { status: 400 };
      }
    });

    if (resp.status != 200) return [];
    else {
      return this.processAssetIDS(resp['data']);
    }
  }

  processAssetIDS(data): assetID[] {
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

  async getReservePerimeter(entityIdOfAsset: string): Promise<MapApiReserveResponse> {
    const resp = await firstValueFrom(
      this.httpService.get(
        this.BaseUrl +
          'plugins/telemetry/ASSET/' +
          entityIdOfAsset +
          '/values/attributes',
        {
          headers: this.headersReq,
        }
      )
    ).catch((error) => {
      if (error.response == undefined) return { status: 400 };
      if (error.response.status == 400) {
        return { status: 400 };
      } else if (error.response.status == 401) {
        return { status: 401 };
      }
    });

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
    } else {
      let ret = {
        code: 404,
        status: 'not found',
        explanation: 'no reserve set',
      };
      resp['data'].forEach((element) => {
        if (element['key'] == 'reservePerimeter') ret = element;
      });
      return ret;
    }
  }
}

export interface assetID {
  name: string;
  type: string;
  EntityID: string;
}
