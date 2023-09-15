export namespace EventHelper {
    export const isCustom = <T>(event: Event): event is CustomEvent<T> => {
        return 'detail' in event;
    }
}
