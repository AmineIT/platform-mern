import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { CardKanbanTemplate } from "./CardKanbanTemplate.js"
import { updateKanbanStatus } from '../../actions/authActions'
import { HeadingContainer, Container, ColoredSpan } from './style'

const KanbanTemplate = ({ kanbanData }) => {

  const dispatch = useDispatch()

  const columnsOption = {
    Applied: {
      name: 'Applied',
      items: kanbanData.filter(data => data.kanbanStatus === 'Applied')
    },
    Screening: {
      name: "Screening",
      items: kanbanData.filter(data => data.kanbanStatus === 'Screening')
    },
    Shortlisted: {
      name: "Shortlisted",
      items: kanbanData.filter(data => data.kanbanStatus === 'Shortlisted')
    },
    Interviewed: {
      name: "Interviewed",
      items: kanbanData.filter(data => data.kanbanStatus === 'Interviewed')
    }
  }

  const [columns, setColumns] = useState(columnsOption)
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { destination, source } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      dispatch(updateKanbanStatus(removed._id, destination.droppableId))
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  }

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([_id, column]) => {
            return (
              <div key={_id} style={{ display: 'flex', flexDirection: 'column', marginRight: '16px' }}>
                <HeadingContainer>
                  <ColoredSpan title={column.name} />
                  <h1>{column.name} ({column.items.length})</h1>
                </HeadingContainer>
                <div>
                  <Droppable droppableId={_id}>
                    {
                      (provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver ? 'lightblue' : '',
                              width: '360px',
                              maxHeight: '500px',
                              overflowY: 'scroll',
                              marginBottom: '100px'
                            }}
                          >
                            {
                              column.items.map((item, index) => {
                                return (
                                  <Draggable key={item._id} draggableId={item._id} index={index}>
                                    {
                                      (provided, snapshot) => {
                                        return (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                              boxShadow: snapshot.isDragging ? '2px 4px 15px rgba(0, 0, 0, 0.05)' : 'none',
                                              marginBottom: '8px',
                                              minHeight: '50px',
                                              userSelect: 'none',
                                              ...provided.draggableProps.style
                                            }}
                                          >
                                            <CardKanbanTemplate data={item} />
                                          </div>
                                        )
                                      }
                                    }
                                  </Draggable>
                                )
                              })
                            }
                            {provided.placeholder}
                          </div>
                        )
                      }
                    }
                  </Droppable>
                </div>
              </div>
            )
          })}
        </DragDropContext>
      </div>
    </Container>
  )
}

export default KanbanTemplate;