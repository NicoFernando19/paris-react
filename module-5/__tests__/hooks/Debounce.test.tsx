import { renderHook, act } from '@testing-library/react';
import useDebounce from '@/hooks/Debounce';

describe('useDebounce Hook testing', () => {
  //membuat fake timer
  jest.useFakeTimers();

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial value'));
    expect(result.current).toBe('initial value');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: 'initial' },
      }
    );

    rerender({ value: 'changed' });
    expect(result.current).toBe('initial');

    // act ini untuk semacam fast track/fast travel.. jadi langsung menjalankan 500 milidetik untuk melihat apakah hook sudah
    //berjalan dengan baik dan sesuai atau belum.. kurang lebih seperti itu sih.
    //klo di dunia nyata mungkin bisa kita nunggu selama 500 milidetik
    //tapi di kodingan ini kita harus fast forward 500 milidetik supaya test bisa berjalan..
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('changed');
  });

  it('should clear timeout on unmount', () => {
    const { unmount } = renderHook(() => useDebounce('test', 500));
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
