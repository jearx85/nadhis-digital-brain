import create from 'zustand';

interface GlobalState {
  blockProps: any;
  setBlockProps: (props: any) => void;
}

const usePandasProps = create<GlobalState>((set) => ({
  blockProps: null, // Estado inicial
  setBlockProps: (props) => set({ blockProps: props }),
}));

export default usePandasProps;