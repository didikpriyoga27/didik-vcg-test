import useBackgroundByTypes from '../src/hooks/useBackgroundByTypes';
import colors from '../src/utils/colors';

describe('useBackgroundByTypes', () => {
  it('should return backgrounds for different Pokémon types', () => {
    const backgrounds = useBackgroundByTypes();

    expect(backgrounds).toEqual({
      grass: [colors.green['gradient-1'], colors.green['gradient-2']],
      fire: [colors.red['gradient-1'], colors.red['gradient-2']],
      water: [colors.blue['gradient-1'], colors.blue['gradient-2']],
      normal: [
        colors['dark-grey']['gradient-1'],
        colors['dark-grey']['gradient-2'],
      ],
      bug: [colors.orange['gradient-1'], colors.orange['gradient-2']],
      poison: [colors.purple['gradient-1'], colors.purple['gradient-2']],
      electric: [colors.yellow['gradient-1'], colors.yellow['gradient-2']],
    });
  });
});
