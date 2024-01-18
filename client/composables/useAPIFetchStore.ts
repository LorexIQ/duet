import type {ComputedRef} from "vue";

const fetchesStore = useState<''[]>('apiFetch:store', () => []);

const addFetch = () => fetchesStore.value.push('');
const removeFetch = () => fetchesStore.value.splice(0, 1);
const isLoader = computed(() => !!fetchesStore.value.length);

export interface UseAPIFetchStoreReturn {
    addFetch(): void;
    removeFetch(): void;
    isLoader: ComputedRef<boolean>;
}

export default function (): UseAPIFetchStoreReturn {
    return {
        addFetch,
        removeFetch,
        isLoader
    };
};
