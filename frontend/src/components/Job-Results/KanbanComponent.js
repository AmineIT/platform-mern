import React from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective
} from "@syncfusion/ej2-react-kanban";
import { CardKanbanTemplate } from "./CardKanbanTemplate.js";

const KanbanTemplate = ({ kanbanData }) => {

  const cardTemplate = props => {
    return <CardKanbanTemplate data={props} />
  }

  const dialogOpen = (args) => {
    args.cancel = true
  }

  return (
    <div className="kanban-control-section">
      <div className="control-section">
        <div className="control-wrapper">
          <KanbanComponent
            dialogOpen={dialogOpen.bind(this)}
            allowDragAndDrop={false}
            id="kanban"
            keyField="kanbanStatus"
            dataSource={kanbanData}
            cardSettings={{
              headerField: "_id",
              template: cardTemplate.bind(this)
            }}
          >
            <ColumnsDirective>
              <ColumnDirective headerText="Applied" keyField="Applied" />
              <ColumnDirective headerText="Screen" keyField="Screen" />
              <ColumnDirective headerText="Offer" keyField="Offer" />
              <ColumnDirective headerText="Hire" keyField="Hire" />
            </ColumnsDirective>
          </KanbanComponent>
        </div>
      </div>
    </div>
  );
};

export default KanbanTemplate;