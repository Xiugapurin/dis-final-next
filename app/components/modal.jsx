export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // 不顯示 Modal 時直接 return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-xl font-bold">
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
