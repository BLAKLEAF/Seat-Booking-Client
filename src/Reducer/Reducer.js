export const initialState = {
  modal: false,
  drawing: false,
  shapes: [],
  newShapes: [],
};

export function reducerfunction(state, action) {
  const { payload, ActionType } = action;
  switch (ActionType) {
    case "OPEN_MODAL":
      return {
        ...state,
        modal: payload,
      };
    case "MOUSE_EVENT_DOWN":
      return {
        ...state,
        newShapes: payload.newShapes,
      };
    case "MOUSE_EVENT_MOVE":
      return {
        ...state,
        newShapes: payload.newShapes,
      };
    case "MOUSE_EVENT_UP":
      return {
        ...state,
        shapes: payload.shapes,
        newShapes: payload.newShapes,
      };
    default:
      return { ...state };
  }
}
