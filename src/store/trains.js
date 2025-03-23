import { create } from 'zustand';

const useStore = create((set) => ({
  station: {}, // Trạng thái ban đầu là một đối tượng rỗng
  trainS: [], // Danh sách tàu chiều đi
  trainsReturn: [], // Danh sách tàu chiều về
  isRound: "", // Trạng thái vé khứ hồi

  // Cập nhật station
  setstation: (station) => set({ station }),

  // Cập nhật danh sách tàu chiều đi
  settrainS: (trainS) => set({ trainS }),

  // Cập nhật danh sách tàu chiều về
  settrainsreturn: (trainsReturn) => set({ trainsReturn }),

  // Cập nhật trạng thái vé khứ hồi
  setisround: (isRound) => set({ isRound }),
}));

export default useStore;
