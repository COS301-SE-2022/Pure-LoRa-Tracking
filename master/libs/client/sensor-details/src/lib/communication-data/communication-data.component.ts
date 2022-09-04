import { Component, Input, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface DataNode {
  name: string;
  children?: DataNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'master-communication-data',
  templateUrl: './communication-data.component.html',
  styleUrls: ['./communication-data.component.scss'],
})
export class CommunicationDataComponent implements OnInit{

  @Input() sensorCommunication = {
    name: ''
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  private transformer(node: DataNode, level: number):ExampleFlatNode {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };
  

  constructor() {
    this.dataSource.data = [this.sensorCommunication];
  }

  ngOnInit(): void {
    const treeData: DataNode[] = [];
    this.extractNested(this.sensorCommunication,treeData);
    console.log(treeData);
    this.dataSource.data = treeData
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  private extractNested(data: any, currentNode: DataNode[], key?: string){
      console.log(data);
      if (typeof data !== 'object'){
        currentNode.push({
          name: key+": "+data,
        });
      } else {
        if (key !== undefined){
          const innerChildren: DataNode[] = [];
          let k: keyof typeof data;
          for (k in data){
            this.extractNested(data[k],innerChildren,k);
          }
          currentNode.push({
            name: key,
            children: innerChildren
          })
        } else {
          let k: keyof typeof data;
          for (k in data){
            this.extractNested(data[k],currentNode,k);
          }
        }
      }
  }

}
